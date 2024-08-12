import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "../courses/entity/course.entity";

@Entity('lesson')
export class Lesson {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: "title" })
    title: string;

    @Column({ name: "content" })
    content: string;

    @Column({ name: "level" })
    level: string;

    @Column({ name: "active" })
    active: boolean;
    
    @ManyToOne(() => Course, (course) => course.lessons)
    @JoinColumn({ name: "courseId" })
    course: Course;
}