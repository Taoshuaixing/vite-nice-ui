import MagicStringBase from 'magic-string';

declare const getTransformResult: (s: MagicStringBase | undefined, id: string) => {
    code: string;
    map: any;
} | undefined;

export { getTransformResult };
