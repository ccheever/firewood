import { Image } from "expo-image";
import { cssInterop } from "nativewind";

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export function Avatar() {

  const ImageInterop = cssInterop(Image, {
    className: 'style',
  })

  return <ImageInterop
    className="rounded-lg overflow-hidden w-12 h-12"
    source={{ uri: 'https://picsum.photos/400/400' }}
    placeholder={{ blurhash }}
    contentFit="cover"
    transition={100}
  />
}

