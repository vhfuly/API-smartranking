import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ChallengeStatus } from '../interfaces/challenge-status.enum';

export class ChallengeStatusValidacaoPipe implements PipeTransform {
  readonly statusAllowed = [
    ChallengeStatus.ACCEPTED,
    ChallengeStatus.DENIED,
    ChallengeStatus.CANCELED
  ];

  transform(value: any) {
    const status = value.status.toUpperCase();

    if (!this.statusValid(status)) {
      throw new BadRequestException(`${status} is an invalid status`);
    }

    return value;
  }

  private statusValid(status: any) {
    const idx = this.statusAllowed.indexOf(status);
    // -1 se o elemento não for encontrado
    return idx !== -1;
  }
}
