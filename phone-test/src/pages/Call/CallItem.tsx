import {
  Grid,
  Icon,
  Typography,
  Box,
  DiagonalDownOutlined,
  DiagonalUpOutlined,
  Button
} from '@aircall/tractor';
import { formatDate, formatDuration } from '../../helpers/dates';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ARCHIVE_CALL } from '../../gql/mutations/archiveCall';

const CallItem = ({ call }: { call: Call }) => {
  const icon = call.direction === 'inbound' ? DiagonalDownOutlined : DiagonalUpOutlined;
  const title =
    call.call_type === 'missed'
      ? 'Missed call'
      : call.call_type === 'answered'
      ? 'Call answered'
      : 'Voicemail';
  const subtitle = call.direction === 'inbound' ? `from ${call.from}` : `to ${call.to}`;
  const duration = formatDuration(call.duration / 1000);
  const date = formatDate(call.created_at);
  const notes = call.notes ? `Call has ${call.notes.length} notes` : <></>;
  const navigate = useNavigate();

  const handleCallOnClick = (callId: string) => {
    navigate(`/calls/${callId}`);
  };

  const [archiveCall] = useMutation(ARCHIVE_CALL);

  return (
    <Box
      key={call.id}
      bg="black-a30"
      borderRadius={16}
      cursor="pointer"
      data-testid="call-item"
      onClick={() => handleCallOnClick(call.id)}
    >
      <Grid
        gridTemplateColumns="32px 1fr max-content"
        columnGap={2}
        borderBottom="1px solid"
        borderBottomColor="neutral-700"
        alignItems="center"
        px={4}
        py={2}
      >
        <Box>
          <Icon component={icon} size={32} />
        </Box>
        <Box>
          <Typography variant="body">{title}</Typography>
          <Typography variant="body2">{subtitle}</Typography>
        </Box>
        <Box>
          <Typography variant="caption" textAlign="right">
            {duration}
          </Typography>
          <Typography variant="caption">{date}</Typography>
        </Box>
      </Grid>
      <Box px={4} py={2}>
        <Typography variant="caption">{notes}</Typography>
      </Box>
      <Box p={10}>
        <Button
          onClick={e => {
            e.stopPropagation();
            archiveCall({ variables: { id: call.id } })
              .then(data => {
                console.log('archive data', data);
              })
              .catch(err => {
                console.log('error', err);
              });
          }}
          variant={call.is_archived ? 'destructive' : 'instructive'}
          size="xSmall"
        >
          {call.is_archived ? 'Unarchive Call' : ' Archive call'}
        </Button>
      </Box>
    </Box>
  );
};

export default CallItem;
