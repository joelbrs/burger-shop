interface Props {
  page?: number;
  size?: number;
}

export default function getSkipParam({ page, size }: Props) {
  if (page && size) {
    return (page - 1) * size;
  }
  return 0;
}
