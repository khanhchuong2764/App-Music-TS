import { Request,Response } from "express";
import Topic from "../../model/topic.model";
import Song from "../../model/songs.model";
import Singer from "../../model/singer.model";

// [GET] /songs/:slugTopic
export const index = async (req:Request,res:Response) => {
    const slugTopic:string = req.params.slugTopic;
    const topic = await Topic.findOne({slug :slugTopic,deleted:false,status:"active"});
    const songs = await Song.find({topicId : topic.id,deleted:false,status:"active"}).select("id title like avatar singerId createdAt slug");
    for (const song of songs) {
        const info = await Singer.findOne({_id :song.singerId ,deleted:false,status:"active"}).select("fullName");
        song["info"] = info;
    }
    res.render("client/pages/songs/list",{
        titlePage : topic.title,
        songs:songs
    })
}

// [GET] /songs/detail/:slugSong
export const detail = async (req:Request,res:Response) => {
    const slug:string = req.params.slugSong;
    const song = await Song.findOne({slug:slug,deleted:false,status:"active"});
    const topic = await Topic.findOne({_id:song["topicId"]}).select("title");
    const singer = await Singer.findOne({_id : song["singerId"]}).select("fullName");
    res.render("client/pages/songs/detail",{
        titlePage : song.title,
        song:song,
        topic:topic,
        singer:singer
    });
}