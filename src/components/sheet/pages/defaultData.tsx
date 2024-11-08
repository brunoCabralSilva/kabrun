export default function DefaultData(props: { value: number, title: string }) {
  const { value, title } = props;
  return(
    <div className="grid grid-cols-4 mt-2">
      <div className="box flex items-center justify-center w-full col-span-1">
        <div className="box__line box__line--top"></div>
        <div className="box__line box__line--right"></div>
        <div className="box__line box__line--bottom"></div>
        <div className="box__line box__line--left"></div>
        <p className="text-xl">{ value }</p>
      </div>
      <div className="py-2 col-span-3 w-full">
        <div className="border-t-2 border-r-2 border-b-2 w-full px-4 py-1 rounded-r">
          { title }
        </div>
      </div>
    </div>
  );
}