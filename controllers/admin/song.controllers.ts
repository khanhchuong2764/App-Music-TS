import { Request,Response } from "express";
import Song from "../../model/songs.model";
import Topic from "../../model/topic.model";
import Singer from "../../model/singer.model";
import { systemConfig } from "../../config/system";

// [GET] /admin/songs/
export const index = async (req:Request,res:Response) => {
    const songs = await Song.find({
        deleted:false
    })
    res.render("admin/pages/songs/index",{
        titlePage: "Quản lý bài hát",
        songs:songs
    })
}


// [GET] /admin/songs/create
export const create = async (req:Request,res:Response) => {
    const topics = await Topic.find({
        deleted:false,
    }).select("title")
    const singers = await Singer.find({deleted:false}).select("fullName");
    res.render("admin/pages/songs/create",{
        titlePage: "Thêm mới bài hát",
        topics:topics,
        singers:singers
    })
}

// [POST] /admin/songs/create
export const createPost = async (req:Request,res:Response) => {
    let avatar = "";
    let audio = "";
    if(req.body.avatar) {
        avatar = req.body.avatar[0];
    }
    if(req.body.audio) {
        audio = req.body.audio[0];
    }
    const dataSong = {
        title : req.body.title,
        topicId : req.body.topicId,
        singerId :req.body.singerId,
        description: req.body.description,
        status: req.body.status,
        avatar : avatar,
        audio: audio,
        lyrics: req.body.lyrics
    }
    const record = new Song(dataSong);
    await record.save();
    res.redirect(`/${systemConfig.preFixAdmin}/songs`);
}



// [GET] /admin/songs/edit/:idSong
export const edit = async (req:Request,res:Response) => {
    const song = await Song.findOne({_id : req.params.idSong,deleted:false});
    const topics = await Topic.find({deleted:false}).select("title");
    const singers = await Singer.find({deleted:false}).select("fullName");
    res.render("admin/pages/songs/edit",{
        titlePage: "Chỉnh sửa bài hát",
        song:song,
        topics:topics,
        singers:singers
    })
}

// [POST] /admin/songs/edit/:idSong
export const editPatch = async (req:Request,res:Response) => {
    const idSong = req.params.idSong;
    const dataSong = {
        title : req.body.title,
        topicId : req.body.topicId,
        singerId :req.body.singerId,
        description: req.body.description,
        status: req.body.status,
        lyrics: req.body.lyrics
    }
    if(req.body.audio) {
        dataSong["audio"] = req.body.audio[0];
    }
    if(req.body.avatar) {
        dataSong["avatar"] = req.body.avatar[0];
    }
    await Song.updateOne({_id:idSong,deleted:false},dataSong);
    res.redirect(`back`);
}
