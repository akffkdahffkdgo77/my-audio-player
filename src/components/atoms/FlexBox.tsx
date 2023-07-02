import styled from '@emotion/styled';
import tw, { TwStyle } from 'twin.macro';

type FlexBoxType = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    twStyle?: TwStyle;
};

const TwDiv = styled.div((props: Pick<FlexBoxType, 'twStyle'>) => [tw`flex`, props.twStyle && props.twStyle]);

export default function FlexBox({ children, ...rest }: FlexBoxType) {
    return <TwDiv {...rest}>{children}</TwDiv>;
}
