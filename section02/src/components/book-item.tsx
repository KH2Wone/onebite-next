import {BookData} from "@/types";
import Link from "next/link";

export default function BookItem({
                                     id,
                                     title,
                                     subTitle,
                                     description,
                                     author,
                                     publisher,
                                     coverImgUrl
                                 }: BookData) {
    return <Link href={`/book/${id}`}>
        <img src={coverImgUrl} alt={title}/>

    </Link>
}