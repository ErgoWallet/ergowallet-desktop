import Tooltip, {TooltipProps} from "@mui/material/Tooltip";
import copy from "clipboard-copy";
import * as React from "react";

interface ChildProps {
  copy: (content: any) => void;
}

interface Props {
  TooltipProps?: Partial<TooltipProps>;
  children: (props: ChildProps) => React.ReactElement<any>;
}

const CopyToClipboard = (props: Props) => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  const onCopy = (content: any) => {
    copy(content);
    setShowTooltip(true);
  };

  const handleOnTooltipClose = () => {
    setShowTooltip(false);
  };

  return (
    <Tooltip
      open={showTooltip}
      title={"Copied to clipboard"}
      leaveDelay={1500}
      onClose={handleOnTooltipClose}
      {...props.TooltipProps || {}}
    >
      {props.children({copy: onCopy})}
    </Tooltip>
  );
};

export default CopyToClipboard;
