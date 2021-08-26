import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from 'mongoose'
export type JobsDocument = Jobs & Document
@Schema()
export class Jobs {
    @Prop({ required: true })
    name: string
}

export const JobsSchema = SchemaFactory.createForClass(Jobs)