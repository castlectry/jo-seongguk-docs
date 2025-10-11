import { Mail, Phone, User } from "lucide-react";

interface InfoItemProps {
    icon: React.ReactNode;
    label: string;
    value: string;
}

function InfoItem({ icon, label, value }: InfoItemProps) {
    return (
        <div
            className="flex items-start gap-5
                whitespace-nowrap
                overflow-hidden">
            <div className="flex-shrink-0">{icon}</div>
            <div className="flex flex-col items-start gap-1 text-left">
                <span className="font-semibold text-white text-base">
                  {label}
                </span>
                <span className="text-gray-400 text-sm">{value}</span>
            </div>
        </div>
    );
}

export default function ProfileInfo() {
    return (
        <div className="md:w-fit mt-6 mb-6
                flex flex-col md:flex-row
                items-start md:items-start
                justify-center md:justify-between
                gap-6 md:gap-8
                px-4 py-4
                text-left
                mx-auto">

            <div className="flex-1 basis-1/3 min-w-0">
                <InfoItem
                    icon={<User size={22} className="text-gray-400" />}
                    label="이름"
                    value="조성국"
                />
            </div>

            <div className="flex-1 basis-1/3 break-words whitespace-normal">
                <InfoItem
                    icon={<Mail size={22} className="text-gray-400" />}
                    label="이메일"
                    value="ksturtle2@naver.com"
                />
            </div>

            <div className="flex-1 basis-1/3 break-words whitespace-normal">
                <InfoItem
                    icon={<Phone size={22} className="text-gray-400" />}
                    label="연락처"
                    value="T. +82 (0)10-5028-7505"
                />
            </div>
        </div>
    );
}
