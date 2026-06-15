'use client'

import {
  Box,
  Collapse,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { useLanguage } from '@/contexts/LanguageContext'

export type SupportNeedKey =
  | 'troubleshooting'
  | 'windowsInstall'
  | 'ssdMigration'
  | 'dataRecovery'
  | 'security'
  | 'other'
  | ''

export type SupportUrgencyKey = 'today' | 'thisWeek' | 'flexible' | ''
export type SupportModeKey = 'remote' | 'onsiteMontreal' | 'either' | ''

export interface TechnicalSupportBriefState {
  needType: SupportNeedKey
  needTypeOther: string
  urgency: SupportUrgencyKey
  deviceOs: string
  supportMode: SupportModeKey
  availability: string
  notes: string
}

export function emptyTechnicalSupportBrief(): TechnicalSupportBriefState {
  return {
    needType: '',
    needTypeOther: '',
    urgency: '',
    deviceOs: '',
    supportMode: '',
    availability: '',
    notes: '',
  }
}

const DenseTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== 'textColor' && prop !== 'helperTextColor',
})<{ textColor?: string; helperTextColor?: string }>(({ theme, textColor, helperTextColor }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: DESIGN_TOKENS.borderRadius.small,
    fontSize: '0.875rem',
    color: textColor || '#fff',
    '& .MuiOutlinedInput-input': { color: textColor || '#fff' },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderWidth: '2px',
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-root': {
    fontSize: '0.875rem',
    color: textColor || '#fff',
    '&.Mui-focused': { color: theme.palette.primary.main },
  },
  '& .MuiFormHelperText-root': {
    fontSize: '0.75rem',
    color: helperTextColor || 'rgba(255,255,255,0.65)',
  },
}))

interface TechnicalSupportBriefSectionProps {
  include: boolean
  onIncludeChange: (v: boolean) => void
  value: TechnicalSupportBriefState
  onChange: (next: TechnicalSupportBriefState) => void
  textColor: string
  compact?: boolean
}

export default function TechnicalSupportBriefSection({
  include,
  onIncludeChange,
  value,
  onChange,
  textColor,
  compact = false,
}: TechnicalSupportBriefSectionProps) {
  const { t } = useLanguage()
  const helper = `${textColor}B3`
  const gap = compact ? 1.5 : 2

  const patch = (partial: Partial<TechnicalSupportBriefState>) => {
    onChange({ ...value, ...partial })
  }

  return (
    <Box id="soutien-technique" sx={{ mt: compact ? 1.5 : 2, scrollMarginTop: 96 }}>
      <FormControlLabel
        control={
          <Switch
            checked={include}
            onChange={(_, v) => onIncludeChange(v)}
            color="primary"
            size="small"
          />
        }
        label={
          <Typography variant="body2" sx={{ color: textColor, fontWeight: 500 }}>
            {t('contact.technicalSupport.toggle')}
          </Typography>
        }
      />

      <Collapse in={include} timeout="auto" unmountOnExit={false}>
        <Box
          sx={{
            pt: 1.5,
            display: 'flex',
            flexDirection: 'column',
            gap,
            pl: { xs: 0, sm: 0.5 },
            borderLeft: { sm: `2px solid ${textColor}22` },
          }}
        >
          <Typography variant="subtitle2" sx={{ color: textColor, fontWeight: 600, letterSpacing: 0.02 }}>
            {t('contact.technicalSupport.sectionTitle')}
          </Typography>

          <FormControl component="fieldset" variant="standard">
            <FormLabel component="legend" sx={{ color: textColor, fontSize: '0.8125rem', mb: 0.5 }}>
              {t('contact.technicalSupport.q1')}
            </FormLabel>
            <RadioGroup
              value={value.needType}
              onChange={(_, v) => patch({ needType: v as SupportNeedKey })}
              name="support-need-type"
            >
              <FormControlLabel
                value="troubleshooting"
                control={<Radio size="small" sx={{ py: 0.25 }} />}
                label={<Typography variant="body2" sx={{ color: textColor }}>{t('contact.technicalSupport.needTroubleshooting')}</Typography>}
              />
              <FormControlLabel
                value="windowsInstall"
                control={<Radio size="small" sx={{ py: 0.25 }} />}
                label={<Typography variant="body2" sx={{ color: textColor }}>{t('contact.technicalSupport.needWindowsInstall')}</Typography>}
              />
              <FormControlLabel
                value="ssdMigration"
                control={<Radio size="small" sx={{ py: 0.25 }} />}
                label={<Typography variant="body2" sx={{ color: textColor }}>{t('contact.technicalSupport.needSsdMigration')}</Typography>}
              />
              <FormControlLabel
                value="dataRecovery"
                control={<Radio size="small" sx={{ py: 0.25 }} />}
                label={<Typography variant="body2" sx={{ color: textColor }}>{t('contact.technicalSupport.needDataRecovery')}</Typography>}
              />
              <FormControlLabel
                value="security"
                control={<Radio size="small" sx={{ py: 0.25 }} />}
                label={<Typography variant="body2" sx={{ color: textColor }}>{t('contact.technicalSupport.needSecurity')}</Typography>}
              />
              <FormControlLabel
                value="other"
                control={<Radio size="small" sx={{ py: 0.25 }} />}
                label={<Typography variant="body2" sx={{ color: textColor }}>{t('contact.technicalSupport.needOther')}</Typography>}
              />
            </RadioGroup>
            {value.needType === 'other' && (
              <DenseTextField
                size="small"
                fullWidth
                placeholder={t('contact.technicalSupport.needOtherPlaceholder')}
                value={value.needTypeOther}
                onChange={(e) => patch({ needTypeOther: e.target.value })}
                textColor={textColor}
                helperTextColor={helper}
                sx={{ mt: 0.5 }}
              />
            )}
          </FormControl>

          <FormControl component="fieldset" variant="standard">
            <FormLabel component="legend" sx={{ color: textColor, fontSize: '0.8125rem', mb: 0.5 }}>
              {t('contact.technicalSupport.q2')}
            </FormLabel>
            <RadioGroup
              value={value.urgency}
              onChange={(_, v) => patch({ urgency: v as SupportUrgencyKey })}
              name="support-urgency"
            >
              <FormControlLabel
                value="today"
                control={<Radio size="small" sx={{ py: 0.25 }} />}
                label={<Typography variant="body2" sx={{ color: textColor }}>{t('contact.technicalSupport.urgencyToday')}</Typography>}
              />
              <FormControlLabel
                value="thisWeek"
                control={<Radio size="small" sx={{ py: 0.25 }} />}
                label={<Typography variant="body2" sx={{ color: textColor }}>{t('contact.technicalSupport.urgencyThisWeek')}</Typography>}
              />
              <FormControlLabel
                value="flexible"
                control={<Radio size="small" sx={{ py: 0.25 }} />}
                label={<Typography variant="body2" sx={{ color: textColor }}>{t('contact.technicalSupport.urgencyFlexible')}</Typography>}
              />
            </RadioGroup>
          </FormControl>

          <DenseTextField
            size="small"
            fullWidth
            label={t('contact.technicalSupport.q3')}
            placeholder={t('contact.technicalSupport.q3Hint')}
            value={value.deviceOs}
            onChange={(e) => patch({ deviceOs: e.target.value })}
            textColor={textColor}
            helperTextColor={helper}
          />

          <FormControl component="fieldset" variant="standard">
            <FormLabel component="legend" sx={{ color: textColor, fontSize: '0.8125rem', mb: 0.5 }}>
              {t('contact.technicalSupport.q4')}
            </FormLabel>
            <RadioGroup
              value={value.supportMode}
              onChange={(_, v) => patch({ supportMode: v as SupportModeKey })}
              name="support-mode"
            >
              <FormControlLabel
                value="remote"
                control={<Radio size="small" sx={{ py: 0.25 }} />}
                label={<Typography variant="body2" sx={{ color: textColor }}>{t('contact.technicalSupport.modeRemote')}</Typography>}
              />
              <FormControlLabel
                value="onsiteMontreal"
                control={<Radio size="small" sx={{ py: 0.25 }} />}
                label={<Typography variant="body2" sx={{ color: textColor }}>{t('contact.technicalSupport.modeOnsiteMontreal')}</Typography>}
              />
              <FormControlLabel
                value="either"
                control={<Radio size="small" sx={{ py: 0.25 }} />}
                label={<Typography variant="body2" sx={{ color: textColor }}>{t('contact.technicalSupport.modeEither')}</Typography>}
              />
            </RadioGroup>
          </FormControl>

          <DenseTextField
            size="small"
            fullWidth
            label={t('contact.technicalSupport.q5')}
            placeholder={t('contact.technicalSupport.q5Hint')}
            value={value.availability}
            onChange={(e) => patch({ availability: e.target.value })}
            textColor={textColor}
            helperTextColor={helper}
          />

          <DenseTextField
            size="small"
            fullWidth
            label={t('contact.technicalSupport.q6')}
            placeholder={t('contact.technicalSupport.q6Hint')}
            value={value.notes}
            onChange={(e) => patch({ notes: e.target.value })}
            multiline
            minRows={2}
            InputLabelProps={{ shrink: true }}
            textColor={textColor}
            helperTextColor={helper}
          />
        </Box>
      </Collapse>
    </Box>
  )
}
