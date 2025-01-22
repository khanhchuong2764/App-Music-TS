import { Request,Response } from "express";
import Song from "../../model/songs.model";
import Singer from "../../model/singer.model";
import { SlugHelper } from "../../helpers/slugHelper";

export const result = async (req:Request,res:Response) => {
    const keyword:string = `${req.query.keyword}`;
    let keywordRegex = keyword.trim();
    const regex = new RegExp(keywordRegex,"i");
    const slugKeyword = SlugHelper(keywordRegex);
    const slugKeywordRegex = new RegExp(slugKeyword,"i");
    const songs = await Song.find({
        slug : slugKeywordRegex,
        deleted:false,
        status: "active"
    })
    for (const item of songs) {
        const inforSinger = await Singer.findOne({_id : item["singerId"]}).select("fullName");
        item["singerFullName"] = inforSinger.fullName;
    }
    res.render("client/pages/search/result",{
        titlePage: "Kết Quả Tìm Kiếm",
        keyword: keyword,
        songs:songs
    })
}