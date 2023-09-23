import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    title: string;
    containerStyles?: string;
    textStyles?:string;
    rightIcon?:string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    btnType?: "button" | "submit";
    isDisabled?:boolean
}

export interface SearchManufacturerProps {
    selected: string;
    setSelected: (manufacturer: string)=>void
}

export interface CarProps {
    city_mpg:number;
    class: string;
    combination_mpg:number;
    cylinders:number;
    displacement:number;
    drive:string;
    fuel_type:string;
    highway_mpg:number;
    make:string;
    model:string;
    transmission:string;
    year:number;
}
export interface CarDetailsProps{
    isOpen:boolean;
    closeModal: () => void;
    car: CarProps;
}

export interface FilterProps{
    manufacturer:string,
    year: number,
    fuel:string,
    limit: number,
    model: string,
}
export interface OptionsProps{
    title:string,
    value:string
}
export interface CustomFilterProps {
    title:string,
    options:OptionsProps[],
}
export interface ShowMoreProps{
    isNext: boolean;
    pageNumber: number;
}
