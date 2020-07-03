import React, { FC, memo } from 'react';
import { Flex, Text, Grid, Button, Status } from '@fluentui/react-northstar';
import { useDispatch, useSelector } from 'react-redux';

import ConfirmDialog from '../ConfirmDialog';
import { deleteCamera } from '../../store/camera/cameraActions';
import { State } from '../../store/State';
import { Project, Status as CameraConfigStatus } from '../../store/project/projectTypes';
import { useParts } from '../../hooks/useParts';
import { LiveViewContainer } from '../LiveViewContainer';
import { AOIData } from '../../type';

interface CameraDetailInfoProps {
  AOIs: AOIData;
  name: string;
  rtsp: string;
  id: number;
}
const CameraDetailInfo: FC<CameraDetailInfoProps> = ({ id, name, rtsp, AOIs }) => {
  const dispatch = useDispatch();

  const { data: project, status } = useSelector<State, Project>((state) => state.project);
  const parts = useParts();

  const isCameraOnline = [CameraConfigStatus.FinishTraining, CameraConfigStatus.StartInference].includes(
    status,
  );

  return (
    <Flex styles={{ padding: '1em 2em' }} column gap="gap.medium">
      <h1>Details</h1>
      <Grid columns="2" styles={{ gap: '3em' }}>
        <Flex column gap="gap.medium">
          <Text size="medium" content={`Name: ${name}`} />
          <Text size="medium" content={`RTSP Url: ${rtsp}`} />
        </Flex>
        <ConfirmDialog
          trigger={
            <Button
              primary
              content="Delete Camera"
              styles={{
                backgroundColor: '#C4314B',
                ':hover': { backgroundColor: '#A72037' },
                ':active': { backgroundColor: '#8E192E' },
              }}
            />
          }
          content="Delete Camera"
          primaryStyles={{
            backgroundColor: '#C4314B',
            ':hover': { backgroundColor: '#A72037' },
            ':active': { backgroundColor: '#8E192E' },
          }}
          onConfirm={(): void => {
            dispatch(deleteCamera(id));
          }}
        />
      </Grid>
      {status !== CameraConfigStatus.WaitTraining && status !== CameraConfigStatus.None && (
        <>
          <ListItem title="Status">
            <CameraStatus online={isCameraOnline} />
          </ListItem>
          <ListItem title="Configured for">
            {parts
              .filter((e) => project.parts.includes(e.id))
              .map((e) => e.name)
              .join(', ')}
          </ListItem>
          <LiveViewContainer showVideo={true} initialAOIData={AOIs} cameraId={project.camera} />
        </>
      )}
    </Flex>
  );
};

export const ListItem = ({ title, footerText = '', children }): JSX.Element => {
  return (
    <div>
      <Flex vAlign="center" gap="gap.medium">
        <Text style={{ width: '200px' }} size="medium">{`${title}: `}</Text>
        {typeof children === 'string' || typeof children === 'number' ? (
          <Text size="medium">{children}</Text>
        ) : (
          children
        )}
      </Flex>
      <Text size="smallest" error>
        {footerText}
      </Text>
    </div>
  );
};

const CameraStatus = ({ online }): JSX.Element => {
  const text = online ? 'Online' : 'Offline';
  const state = online ? 'success' : 'unknown';

  return (
    <Flex gap="gap.smaller" vAlign="center">
      <Status state={state} />
      <Text styles={{ margin: '5px' }} size="medium">
        {text}
      </Text>
    </Flex>
  );
};

export default memo(CameraDetailInfo);
