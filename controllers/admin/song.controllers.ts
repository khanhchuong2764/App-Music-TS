import { Request,Response } from "express";
import Song from "../../model/songs.model";
import Topic from "../../model/topic.model";
import Singer from "../../model/singer.model";

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