import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { LessonServiceImpl } from "../services/lessonImpl.service";

@Controller("lessons")
export class LessonsController {
    constructor(private service: LessonServiceImpl) {}

    @Get()
    async findAll(@Query() query: any) {
        return await this.service.findAll(query);
    }

    @Get(":id")
    async findById(@Param("id") id: string) {
        return await this.service.findOne(id);
    }

    @Post()
    async create(@Body() createLessonDto: any, @Body("courseId") courseId: string) {
        return await this.service.create(createLessonDto, courseId);
    }

    @Put(":id")
    async update(@Param("id") id: string, @Body() updateLessonDto: any) {
        return await this.service.update(id, updateLessonDto);
    }

    @Delete(":id")
    async remove(@Param("id") id: string) {
        return await this.service.remove(id);
    }
}