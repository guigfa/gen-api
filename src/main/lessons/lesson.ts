import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "../courses/entity/course";

@Entity('lesson')
export class Lesson {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: "title" })
    title: string;

    @Column({ name: "content" })
    content: string;

    @Column({ name: "active" })
    active: boolean;
    
    @ManyToOne(() => Course, (course) => course.lessons)
    course: Course;
}