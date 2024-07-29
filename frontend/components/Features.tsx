import { featuresDivContent } from "@/utils/constants"
import Image from "next/image"

const Features = () => {
  return (
    <section className="grid grid-cols-3 gap-2">
      {featuresDivContent.map((feature, index) => (
        <div
          key={index}
          className="features-div"
        >
          <Image src={feature.img} width={76} height={50} alt={feature.title} />
          <div className="">
            <p className="font-semibold text-[#757575]">{feature.title}</p>
            <p className="text-sm text-[#868686]">{feature.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Features