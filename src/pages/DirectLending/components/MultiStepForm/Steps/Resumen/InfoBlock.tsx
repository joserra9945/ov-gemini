interface InfoBlockProps {
  title: string;
  description: string;
  content: string;
}
const InfoBlock: React.FC<InfoBlockProps> = ({
  title,
  content,
  description,
}) => (
  <div className="flex flex-col shrink">
    <p className="text-[#00D8AC] font-roboto text-lg font-medium leading-5 pb-4">
      {title}
    </p>
    <div>
      <p className="font-roboto text-base font-normal leading-5">
        {description}
      </p>
      <p className="font-roboto text-lg font-bold leading-5">{content}</p>
    </div>
  </div>
);

export default InfoBlock;
