import { IsNumber, IsString, Length, IsEnum, IsOptional } from "class-validator";
import { Type, Complexity } from "./ticket.entity";

export class CreateUpdateTicketDto {
  @Length(3, 200)
  @IsString()
  summary: string;

  @IsString()
  description: string;

  @IsEnum(Type, {
    message: "Ticket type should be Enhancement, BugFix, Development or QA",
  })
  type: Type;

  @IsEnum(Complexity, {
    message: "Complexity should be set to Low, Mid or High",
  })
  complexity: Complexity;

  @IsNumber()
  completionTime: number;

  @IsNumber()
  cost: number;

  @IsString()
  @IsOptional()
  status: string;
}
