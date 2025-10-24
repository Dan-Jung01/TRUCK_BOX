import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Container,
  CssBaseline,
  Grid,
  InputAdornment,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography
} from '@mui/material';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    background: { default: '#f4f6f8' },
    primary: { main: '#1976d2' }
  },
  typography: {
    fontFamily: '"Pretendard", "Roboto", "Helvetica", "Arial", sans-serif',
    h6: { fontWeight: 600 }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px'
        }
      }
    }
  }
});

theme = responsiveFontSizes(theme);

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

export default function App() {
  const [box, setBox] = useState({ width: '0', length: '0', height: '0' });
  const [selectedBoxes, setSelectedBoxes] = useState([]);

  // 입력 값이 특정 프리셋과 일치하는지 감지하여 중복된 값 모두 Fill 상태로 표시
  useEffect(() => {
    const matchedKeys = Object.keys(presetBoxes).filter(
      (key) =>
        parseFloat(box.width) === presetBoxes[key].width &&
        parseFloat(box.length) === presetBoxes[key].length &&
        parseFloat(box.height) === presetBoxes[key].height
    );
    setSelectedBoxes(matchedKeys);
  }, [box]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setBox({ ...box, [name]: value });
    }
  };

  const handlePresetSelect = (key) => {
    if (selectedBoxes.includes(key)) {
      // 이미 선택된 Chip 클릭 시 해제 및 초기화
      setSelectedBoxes([]);
      setBox({ width: '0', length: '0', height: '0' });
    } else {
      // 선택한 Chip의 박스 크기로 설정
      const targetBox = presetBoxes[key];
      setBox(targetBox);
      // 같은 크기의 Chip 모두 활성화
      const matchedKeys = Object.keys(presetBoxes).filter(
        (k) =>
          presetBoxes[k].width === targetBox.width &&
          presetBoxes[k].length === targetBox.length &&
          presetBoxes[k].height === targetBox.height
      );
      setSelectedBoxes(matchedKeys);
    }
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            트럭 적재 가능 박스 수 계산기
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* 입력 섹션 */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader title="박스 크기 입력 (단위: mm)" titleTypographyProps={{ variant: 'h6' }} />
              <CardContent>
                <Stack spacing={3}>
                  <TextField label="가로 (Width)" name="width" value={box.width} onChange={handleChange} InputProps={{ endAdornment: <InputAdornment position="end">mm</InputAdornment> }} fullWidth />
                  <TextField label="세로 (Length)" name="length" value={box.length} onChange={handleChange} InputProps={{ endAdornment: <InputAdornment position="end">mm</InputAdornment> }} fullWidth />
                  <TextField label="높이 (Height)" name="height" value={box.height} onChange={handleChange} InputProps={{ endAdornment: <InputAdornment position="end">mm</InputAdornment> }} fullWidth />

                  <Box pt={2}>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                      빠른 선택 (박스 종류)
                    </Typography>
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                      {Object.keys(presetBoxes).map((key) => (
                        <Chip
                          key={key}
                          label={key}
                          onClick={() => handlePresetSelect(key)}
                          variant={selectedBoxes.includes(key) ? 'filled' : 'outlined'}
                          color={selectedBoxes.includes(key) ? 'primary' : 'default'}
                        />
                      ))}
                    </Stack>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* 결과 섹션 */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardHeader
                title={`트럭 종류별 적재 가능 박스 수${selectedBoxes.length > 0 ? ` (${selectedBoxes.join(', ')})` : ''}`}
                titleTypographyProps={{ variant: 'h6' }}
              />
              <CardContent>
                <TableContainer component={Paper} variant="outlined">
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead sx={{ bgcolor: 'grey.100' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>트럭 종류</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>적재 가능 박스 수</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>내부 크기 (가로×세로×높이, mm)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {trucks.map((truck) => (
                        <TableRow key={truck.name}>
                          <TableCell>{truck.name}</TableCell>
                          <TableCell align="center" sx={{ fontWeight: 500, color: 'primary.main' }}>
                            {calculateBoxes(truck)}
                          </TableCell>
                          <TableCell>{`${truck.width} × ${truck.length} × ${truck.height}`}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}