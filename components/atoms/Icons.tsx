import Image from "next/image";

export function AttachmentIcon() {
  return (
    <Image
      src="/icons/attachment.svg"
      alt="Attachment"
      width={20}
      height={20}
    />
  );
}

export function ControlsIcon() {
  return (
    <Image src="/icons/controls.svg" alt="Controls" width={20} height={20} />
  );
}

export function InstrumentalIcon() {
  return (
    <Image
      src="/icons/instrumental.svg"
      alt="Instrumental"
      width={20}
      height={20}
    />
  );
}

export function AddIcon() {
  return <Image src="/icons/add.svg" alt="Add" width={20} height={20} />;
}

export function ArrowRightIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-icon-default"
    >
      <path
        d="M7 4L13 10L7 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type IconProps = {
  className?: string;
};

export function SendIcon({ className = "" }: IconProps = {}) {
  return (
    <Image
      src="/icons/send.svg"
      alt="Send"
      width={38}
      height={40}
      className={className}
    />
  );
}
