// Footer component

const Footer = () => {
    return (
      <div className="w-[399px] justify-start items-center gap-2 flex flex-row">
        <div className="w-[164px] relative">
          <img className="w-[26px] left-[56px] top-0 absolute" src="/assets/footer.jpg" alt="Logo" />
        </div>
        <div className="w-[26px] h-[0px] origin-top-left rotate-90 border border-slate-300"></div>
        <div className="text-center text-slate-300 text-xs font-bold font-['Mulish'] leading-[18px]">© 2022 Bitnovo. All rights reserved.</div>

      </div>
    );
  };

    export default Footer;  