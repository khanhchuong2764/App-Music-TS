import { Request,Response } from "express";
import Song from "../../model/songs.model";
import Singer from "../../model/singer.model";
import { SlugHelper } from "../../helpers/slugHelper";

// [GET] /search/result
export const result = async (req:Request,res:Response) => {
    const type:string = req.params.type;
    const keyword:string = `${req.query.keyword}`;
    let keywordRegex = keyword.trim();
    const slugKeyword = SlugHelper(keywordRegex);
    const slugKeywordRegex = new RegExp(slugKeyword,"i");   
    const songs = await Song.find({
        slug : slugKeywordRegex,
        deleted:false,
        status: "active"
    });
    let arraySongs = [];
    for (const item of songs) {
        const inforSinger = await Singer.findOne({_id : item["singerId"]}).select("fullName");
        arraySongs.push({
            title: item.title,
            avatar: item.avatar,
            slug : item.slug,
            like: item.like,
            singerFullName : inforSinger.fullName
        });
    }
    if(type== "result") {
        res.render("client/pages/search/result",{
            titlePage: `Kết Quả Tìm Kiếm : ${keyword}`,
            keyword: keyword,
            songs:arraySongs
        })
    }else {
        res.json({
            code:200,
            songs:arraySongs
        })
    }
}
