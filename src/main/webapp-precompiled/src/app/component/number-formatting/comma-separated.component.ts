import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'commaSeparatedNumber' })
export class CommaSeparatedNumberPipe implements PipeTransform {
    transform(value: number): string {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}




