import unidecode from "unidecode";
export const SlugHelper = (keyword:string) : string => {
    let slugKeyword = unidecode(keyword);
    slugKeyword = slugKeyword.replace(/\s+/g, "-");
    return slugKeyword;
}