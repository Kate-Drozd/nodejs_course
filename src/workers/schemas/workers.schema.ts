import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from 'mongoose'
export type WorkersDocument = Workers & Document
@Schema()
export class Workers {
    @Prop({ required: true })
    firstName: string
    @Prop({ required: true })
    lastName: string
}

export const WorkersSchema = SchemaFactory.createForClass(Workers)