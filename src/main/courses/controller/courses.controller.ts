import { Controller } from "@nestjs/common";
import { CourseServiceImpl } from "../services/courseImpl.service";

@Controller("courses")
export class CourseController {
    constructor(private service: CourseServiceImpl) {}

    // @Get()
    // async findAll(@Query() query: any) {
    //     return await this.coursesService.findAll(query);
    // }

    // @Get(":id")
    // async findOne(@Param("id") id: string) {
    //     return await this.coursesService.findOne(id);
    // }

    // @Post()
    // async create(@Body() createCourseDto: CreateCourseDto) {
    //     return await this.coursesService.create(createCourseDto);
    // }

    // @Put(":id")
    // async update(@Param("id") id: string, @Body() updateCourseDto: UpdateCourseDto) {
    //     return await this.coursesService.update(id, updateCourseDto);
    // }

    // @Delete(":id")
    // async remove(@Param("id") id: string) {
    //     return await this.coursesService.remove(id);
    // }
}