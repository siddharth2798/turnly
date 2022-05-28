import { EntityAttributes, ICommand } from '@turnly/shared'
import { Answer } from 'Answers/domain/entities/Answer'

export class SaveAnswerReadingDBCommand implements ICommand {
  public constructor(public readonly payload: EntityAttributes<Answer>) {}
}
