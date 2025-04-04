import { randomUUID } from "crypto"
import { sql } from './db.js'
import { title } from "process";

export class DatabasePostgres {
    async list(search = '') {
        const searchTerm = `%${search}%`;

        const videos = search
            ? await sql`SELECT * FROM videos WHERE title ILIKE ${searchTerm}`
            : await sql`SELECT * FROM videos`;

    return videos
    }

    async create(video) {
        const videoId = randomUUID()

        await sql`
            INSERT INTO videos (id, title, description, duration) 
            VALUES (${videoId}, ${video.title}, ${video.description}, ${video.duration})
        `
    }

    async update(id, video) {
        await sql`update videos set title = ${video.title}, description = ${video.description}, duration = ${video.duration} WHERE id = ${id}`
    }

    async delete(id) {
        await sql`delete from videos where id = ${id}`
    }
}