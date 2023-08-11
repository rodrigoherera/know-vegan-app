import { TagButtonText, TagOptionButton } from "./AddScreenStyles";

export default function TagsButton({ type, selected, onSelect }) {
  return (
    <TagOptionButton
      selected={selected}
      onPress={() => onSelect(type)}
      type={type}
    >
      <TagButtonText selected={selected}>{type}</TagButtonText>
    </TagOptionButton>
  );
}
