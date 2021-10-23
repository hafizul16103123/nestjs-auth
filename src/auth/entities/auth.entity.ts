
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User{
    @Prop()
    id: Number;
    @Prop()
    email: string;
    @Prop()
    password: string;
}
export const UserSchema = SchemaFactory.createForClass(User);