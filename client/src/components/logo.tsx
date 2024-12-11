import LogoImg from "../assets/logo.png";

export default function Logo() {
  return (
    <div className="flex items-center font-semibold">
      <img className="mr-1 size-9" src={LogoImg} alt="classroom logo" />
      EduSphere
    </div>
  );
}
