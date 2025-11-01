import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";

type Props = {
  images: string[];
  direction?: "horizontal" | "vertical";
};

export function ProductImageCarousel({ images, direction = "horizontal" }: Props) {
  const showArrows = images?.length > 1;
  return (
    <Card
      className={`overflow-hidden relative ${
        direction === "vertical" ? "w-64" : "w-full"
      }`}
    >
      <Carousel
        orientation={direction}
        className={direction === "vertical" ? "w-64" : "w-full"}
      >
        <CarouselContent
          className={direction === "vertical" ? "flex flex-col" : ""}
        >
          {images?.map((img, index) => (
            <CarouselItem
              key={index}
              className={`relative ${
                direction === "vertical" ? "h-64" : "h-100"
              }`}
            >
              <Image
                src={`http://localhost:5000${img}`}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {showArrows && (
          <>
            <CarouselPrevious
              className={`absolute ${
                direction === "vertical"
                  ? "top-2 left-1/2 -translate-x-1/2"
                  : "left-2 top-1/2 -translate-y-1/2"
              } z-10 bg-white/80`}
            />
            <CarouselNext
              className={`absolute ${
                direction === "vertical"
                  ? "bottom-2 left-1/2 -translate-x-1/2"
                  : "right-2 top-1/2 -translate-y-1/2"
              } z-10 bg-white/80`}
            />
          </>
        )}
      </Carousel>
    </Card>
  );
}
