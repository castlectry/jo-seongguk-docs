import { useGlobalScrollNavigation } from "../UseScrollNavigation.tsx";

export type ScrollNavProps = Pick<
    ReturnType<typeof useGlobalScrollNavigation>,
    "scrollNext" | "scrollPrev" | "scrollToIndex"
>;
