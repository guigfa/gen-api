import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { LessonServiceImpl } from "../services/lessonImpl.service";
import { AjaxResponse } from "src/shared/models/response.model";
import { Observable } from "rxjs";
import { Lesson } from "../lesson.entity";

@Controller("lessons")
export class LessonsController {
    constructor(private service: LessonServiceImpl) {}

    @Get()
    findAll(@Query() query: Partial<Lesson>): Observable<Lesson[]> {
        return this.service.findAll(query);
    }

    @Post()
    create(@Body() createLessonDto: any, @Body("courseId") courseId: string): Observable<AjaxResponse> {
        return this.service.create(createLessonDto, courseId);
    }

    @Put(":id")
    update(@Param("id") id: string, @Body() updateLessonDto: any): Observable<AjaxResponse> {
        return this.service.update(id, updateLessonDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string): Observable<AjaxResponse> {
        return this.service.delete(id);
    }
}
