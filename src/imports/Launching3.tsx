import imgImage1 from "figma:asset/e30c10d7f9b16dd75f0275ed8191330fefa3bd8d.png";

export default function Launching() {
  return (
    <div className="bg-white relative size-full" data-name="Launching -3">
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.4067366421222687)+(var(--transform-inner-height)*0.9135454893112183)))] items-center justify-center left-[-200px] top-[-202px] w-[calc(1px*((var(--transform-inner-height)*0.4067366421222687)+(var(--transform-inner-width)*0.9135454893112183)))]" style={{ "--transform-inner-width": "649", "--transform-inner-height": "380" } as React.CSSProperties}>
        <div className="flex-none rotate-[336deg]">
          <div className="bg-gradient-to-b from-[#310100] from-[40.385%] h-[379.971px] to-[#780302] w-[648.964px]" />
        </div>
      </div>
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.4067366421222687)+(var(--transform-inner-height)*0.9135454893112183)))] items-center justify-center left-[-120.99px] top-[380.9px] w-[calc(1px*((var(--transform-inner-height)*0.4067366421222687)+(var(--transform-inner-width)*0.9135454893112183)))]" style={{ "--transform-inner-width": "626", "--transform-inner-height": "415" } as React.CSSProperties}>
        <div className="flex-none rotate-[336deg]">
          <div className="bg-gradient-to-b from-[#780302] h-[415.002px] to-[#310100] to-[97.596%] w-[625.67px]" />
        </div>
      </div>
      <div className="absolute left-1/2 size-[277px] top-[calc(50%-27.5px)] translate-x-[-50%] translate-y-[-50%]" data-name="image 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage1} />
      </div>
    </div>
  );
}