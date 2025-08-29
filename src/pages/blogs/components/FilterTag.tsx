import clsx from "clsx";

export const FilterTag = (props: { tag: string, isSelected: boolean, onClick?: (tag: string) => void }) => {
    const { tag, isSelected, onClick } = props;

    return (
        <button
            className={clsx("px-4 py-2 bg-white/80 text-gray-700 rounded-full font-bold hover-grow", {
                "border-2 border-[#3f8efc]": isSelected,
            })}

            onClick={() => onClick?.(tag)}
        >
            {tag}
        </button>
    )
}