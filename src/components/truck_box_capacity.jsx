import React, { useState } from 'react';
import { Container, Typography, Grid, TextField, Card, CardContent, Table, TableHead, TableRow, TableCell, TableBody, Button, Stack, Box } from '@mui/material';

const trucks = [
  { name: '1톤', width: 1600, length: 2800, height: 1600 },
  { name: '1톤 장축', width: 1600, length: 3100, height: 1600 },
  { name: '1.4톤', width: 1700, length: 3100, height: 1800 },
  { name: '1.4톤 장축', width: 1700, length: 3400, height: 1800 },
  { name: '2.5톤', width: 1900, length: 4300, height: 2000 },
  { name: '3.5톤', width: 2000, length: 5000, height: 2200 },
  { name: '5톤', width: 2300, length: 6200, height: 2400 }
];

const presetBoxes = {
  UR: { width: 600, length: 400, height: 300 },
  NH: { width: 640, length: 280, height: 210 },
  SR: { width: 550, length: 280, height: 250 },
  EH: { width: 650, length: 260, height: 430 },
  AL: { width: 480, length: 270, height: 300 },
  UV: { width: 640, length: 280, height: 380 },
  TS: { width: 550, length: 280, height: 250 },
  '승연300': { width: 600, length: 400, height: 300 },
  '승연500': { width: 600, length: 400, height: 360 },
  '형제250': { width: 580, length: 275, height: 380 },
  '형제300': { width: 600, length: 300, height: 400 },
  '폴록': { width: 700, length: 300, height: 440 }
};

export default function TruckLoadCalculator() {
  const [box, setBox] = useState({ width: '', length: '', height: '' });

  const handleChange = (e) => {
    setBox({ ...box, [e.target.name]: e.target.value });
  };

  const handlePresetSelect = (preset) => {
    setBox(presetBoxes[preset]);
  };

  const calculateBoxes = (truck) => {
    const truckVolume = truck.width * truck.length * truck.height;
    const boxVolume = box.width * box.length * box.height;

    if (!boxVolume || boxVolume === 0) return '-';

    const countByWidth = Math.floor(truck.width / box.width);
    const countByLength = Math.floor(truck.length / box.length);
    const countByHeight = Math.floor(truck.height / box.height);

    return countByWidth * countByLength * countByHeight;
  };

  // 반응형 폰트 설정 (vw 단위 사용)
  const responsiveFont = {
    fontSize: {
      xs: '5vw',
      sm: '3vw',
      md: '2vw',
      lg: '1.5vw'
    },
    whiteSpace: 'nowrap'
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, backgroundColor: '#f5f7fa', p: 4, borderRadius: 3 }}>
      <Typography align="center" gutterBottom fontWeight={600} color="primary.main" sx={responsiveFont}>
        트럭 적재 가능 박스 수 계산기
      </Typography>

      <Card sx={{ p: 3, mb: 4, backgroundColor: '#ffffff', boxShadow: 3, borderRadius: 2 }}>
        <Typography gutterBottom color="text.primary" sx={responsiveFont}>
          박스 크기 입력 (단위: mm)
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="가로 (mm)" name="width" value={box.width} onChange={handleChange} type="number" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="세로 (mm)" name="length" value={box.length} onChange={handleChange} type="number" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="높이 (mm)" name="height" value={box.height} onChange={handleChange} type="number" variant="outlined" />
          </Grid>
        </Grid>
      </Card>

      <Card sx={{ p: 3, mb: 4, backgroundColor: '#e3f2fd', borderRadius: 2, boxShadow: 1 }}>
        <Typography gutterBottom color="text.primary" sx={responsiveFont}>
          빠른 선택 (박스 종류)
        </Typography>
        <Stack direction="row" flexWrap="wrap" spacing={2} rowGap={2}>
          {Object.keys(presetBoxes).map((key) => (
            <Button
              key={key}
              variant="contained"
              onClick={() => handlePresetSelect(key)}
              sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}
            >
              {key}
            </Button>
          ))}
        </Stack>
      </Card>

      <Card sx={{ backgroundColor: '#fffde7', boxShadow: 2, borderRadius: 2 }}>
        <CardContent>
          <Typography gutterBottom color="text.primary" sx={responsiveFont}>
            트럭 종류별 크기 및 적재 가능 박스 수
          </Typography>
          <Box sx={{ overflowX: 'auto' }}> {/* 가로 스크롤 추가 */}
            <Table sx={{ minWidth: 600 }}> {/* 표가 잘릴 경우 스크롤 가능 */}
              <TableHead sx={{ backgroundColor: '#f1f8e9' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}>트럭 종류</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}>적재 가능 박스 수</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}>내부 크기 (가로×세로×높이, mm)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {trucks.map((truck) => (
                  <TableRow key={truck.name}>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>{truck.name}</TableCell>
                    <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>{calculateBoxes(truck)}</TableCell>
                    <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>{`${truck.width} × ${truck.length} × ${truck.height}`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}