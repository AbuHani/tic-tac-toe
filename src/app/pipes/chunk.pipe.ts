import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chunk',
  pure: false,
})
export class ChunkPipe implements PipeTransform {
  transform(arr: any[], size: number) {
    return arr.reduce(
      (prev, curr, i) =>
        i % size ? prev : prev.concat([arr.slice(i, i + size)]),
      []
    );
  }
}
