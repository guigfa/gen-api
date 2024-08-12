import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from "@nestjs/common";
import { CourseServiceImpl } from "../services/courseImpl.service";
import { Observable } from "rxjs";
import { AjaxResponse } from "src/shared/models/response.model";
import { Course } from "../entity/course.entity";

@Controller("courses")
export class CourseController {
    constructor(private service: CourseServiceImpl) {}

    @Get()
    findAll(@Query() query: Partial<Course>): Observable<AjaxResponse> {
        return this.service.findAll(query);
    }

    @Get(":id")
    findOne(@Param("id") id: string): Observable<AjaxResponse> {
        return this.service.findOne(id);
    }

    @Post()
    create(@Body() createCourseDto: Course): Observable<AjaxResponse> {
        return this.service.create(createCourseDto);
    }

    @Put(":id")
    update(@Param("id") id: string, @Body() updateCourseDto: Partial<Course>): Observable<AjaxResponse> {
        return this.service.update(id, updateCourseDto);
    }

    @Delete(":id")
    @HttpCode(204)
    remove(@Param("id") id: string): Observable<AjaxResponse> {
        return this.service.delete(id);
    }
}