import { Typography } from 'antd';

const { Title, Text, Paragraph } = Typography;

export default function AppTypography(
  props: React.ComponentProps<typeof Typography>
) {
  return <Typography {...props} />;
}

AppTypography.Title = Title;
AppTypography.Text = Text;
AppTypography.Paragraph = Paragraph;
