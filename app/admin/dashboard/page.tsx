"use client";

import { Add as AddIcon, CheckCircle as CheckCircleIcon, Delete as DeleteIcon, Edit as EditIcon, Logout as LogoutIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import {
	Alert,
	AppBar,
	Box,
	Button,
	Card,
	CardContent,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Snackbar,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Toolbar,
	Typography,
	CircularProgress
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { getProjectImageLetterboxGlassSx } from '@/components/shared/cardSurface';
import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { navigateProjectUrl } from '@/lib/navigateProjectUrl';

interface Project {
  id: number;
  name: string;
  description: string;
  technologies: string;
  status: string;
  projectType: 'logiciel' | 'web';
  webAudience?: 'personal' | 'professional' | null;
  displayOrder: number;
  url?: string;
  siteUrl?: string | null;
  downloadUrl?: string | null;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

type TimelendrPlatform = 'windows' | 'macos' | 'both';

interface TimelendrRelease {
  id: number;
  filePath: string;
  changelog: string;
  version: string | null;
  platform?: TimelendrPlatform;
  createdAt: string;
  updatedAt: string;
}

const ADMIN_PROJECT_TABLE_COL_SPAN = 11;

type AdminDashboardProjectRowProps = {
  project: Project;
  getImageUrl: (imageUrl: string) => string;
  handleOpenProjectUrl: (url: string) => void;
  handleOpenDialog: (project?: Project) => void;
  handleDelete: (id: number) => void;
};

function AdminDashboardProjectRow({
  project,
  getImageUrl,
  handleOpenProjectUrl,
  handleOpenDialog,
  handleDelete,
}: AdminDashboardProjectRowProps) {
  return (
    <TableRow>
      <TableCell>{project.name}</TableCell>
      <TableCell>
        <Typography variant="body2" sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {project.description}
        </Typography>
      </TableCell>
      <TableCell>{project.technologies}</TableCell>
      <TableCell>{project.status}</TableCell>
      <TableCell>{project.projectType === 'logiciel' ? 'Logiciel' : 'Sites web'}</TableCell>
      <TableCell>
        {project.projectType === 'logiciel'
          ? '—'
          : project.webAudience === 'personal'
            ? 'Perso'
            : 'Pro'}
      </TableCell>
      <TableCell>{project.displayOrder ?? 0}</TableCell>
      <TableCell>
        {project.url && (
          <Button size="small" onClick={() => handleOpenProjectUrl(project.url!)}>
            Voir
          </Button>
        )}
      </TableCell>
      <TableCell>
        {project.downloadUrl && (
          <Button size="small" href={project.downloadUrl} target="_blank" rel="noopener noreferrer">
            Fichier
          </Button>
        )}
      </TableCell>
      <TableCell>
        {project.imageUrl && (
          <Box
            component="img"
            src={getImageUrl(project.imageUrl)}
            alt={project.name}
            sx={{
              width: 50,
              height: 50,
              objectFit: 'cover',
              borderRadius: 1,
              display: 'block',
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        )}
      </TableCell>
      <TableCell>
        {project.siteUrl && (
          <Button size="small" onClick={() => handleOpenProjectUrl(project.siteUrl!)} sx={{ mr: 0.5 }}>
            Voir le site
          </Button>
        )}
        <IconButton size="small" onClick={() => handleOpenDialog(project)} color="primary">
          <EditIcon />
        </IconButton>
        <IconButton size="small" onClick={() => handleDelete(project.id)} color="error">
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    technologies: '',
    status: '',
    projectType: 'web' as 'logiciel' | 'web',
    webAudience: 'professional' as 'personal' | 'professional',
    displayOrder: 0,
    url: '',
    siteUrl: '',
    downloadUrl: '',
    imageUrl: ''
  });
  const [uploading, setUploading] = useState(false);
  const [uploadingDownload, setUploadingDownload] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const downloadFileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const theme = useTheme();

  const handleOpenProjectUrl = useCallback(
    (url: string) => {
      navigateProjectUrl(url, router);
    },
    [router]
  );

  // Timelendr releases
  const [timelendrReleases, setTimelendrReleases] = useState<TimelendrRelease[]>([]);
  const [timelendrLoading, setTimelendrLoading] = useState(true);
  const [timelendrChangelog, setTimelendrChangelog] = useState('');
  const [timelendrVersion, setTimelendrVersion] = useState('');
  const [timelendrFileUrl, setTimelendrFileUrl] = useState('');
  const [timelendrPlatform, setTimelendrPlatform] = useState<TimelendrPlatform>('both');
  const [timelendrUploading, setTimelendrUploading] = useState(false);
  const [timelendrSuccessOpen, setTimelendrSuccessOpen] = useState(false);
  const [timelendrSuccessDetail, setTimelendrSuccessDetail] = useState('');

  // Fonction pour corriger les chemins d'images
  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) return '';
    
    // Si c'est une URL complète (http/https), la retourner telle quelle
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    // Si c'est un chemin relatif commençant par "public/", le corriger
    if (imageUrl.startsWith('public/')) {
      return imageUrl.replace('public/', '/');
    }
    
    // Si c'est un chemin relatif sans "public/", ajouter "/"
    if (!imageUrl.startsWith('/')) {
      return `/${imageUrl}`;
    }
    
    return imageUrl;
  };

  const projectsWebSorted = useMemo(
    () =>
      projects
        .filter((p) => (p.projectType ?? 'web') === 'web')
        .sort((a, b) => a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' })),
    [projects]
  );

  const projectsLogicielSorted = useMemo(
    () =>
      projects
        .filter((p) => p.projectType === 'logiciel')
        .sort((a, b) => a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' })),
    [projects]
  );

  const fetchProjects = useCallback(async () => {
    try {
      const response = await fetch('/api/projects', { credentials: 'include' });
      const data = await response.json();
      
      if (data.success) {
        setProjects(data.data);
      } else {
        setError('Erreur lors du chargement des projets');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setError('Erreur lors du chargement des projets');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTimelendrReleases = useCallback(async () => {
    try {
      const response = await fetch('/api/timelendr/releases', { credentials: 'include' });
      const data = await response.json();
      if (data.success) {
        setTimelendrReleases(data.data);
      }
    } catch (e) {
      console.error('Timelendr releases:', e);
    } finally {
      setTimelendrLoading(false);
    }
  }, []);

  const redirectToAdminLogin = useCallback(() => {
    router.push('/admin');
  }, [router]);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await fetch('/api/auth/session', { credentials: 'include' });
        const data = await response.json().catch(() => ({}));
        if (!data.authenticated) {
          redirectToAdminLogin();
          return;
        }
        fetchProjects();
        fetchTimelendrReleases();
      } catch {
        redirectToAdminLogin();
      }
    };
    void verifySession();
  }, [fetchProjects, fetchTimelendrReleases, redirectToAdminLogin]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } catch (error) {
      console.error('Logout:', error);
    } finally {
      router.push('/');
    }
  };

  const handleOpenDialog = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        name: project.name,
        description: project.description,
        technologies: project.technologies,
        status: project.status,
        projectType: project.projectType ?? 'web',
        webAudience: project.webAudience === 'personal' ? 'personal' : 'professional',
        displayOrder: project.displayOrder ?? 0,
        url: project.url || '',
        siteUrl: project.siteUrl || '',
        downloadUrl: project.downloadUrl || '',
        imageUrl: project.imageUrl || ''
      });
      setPreviewImage(project.imageUrl ? getImageUrl(project.imageUrl) : null);
    } else {
      setEditingProject(null);
      setFormData({
        name: '',
        description: '',
        technologies: '',
        status: '',
        projectType: 'web',
        webAudience: 'professional',
        displayOrder: 0,
        url: '',
        siteUrl: '',
        downloadUrl: '',
        imageUrl: ''
      });
      setPreviewImage(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProject(null);
    setFormData({
      name: '',
      description: '',
      technologies: '',
      status: '',
      projectType: 'web',
      webAudience: 'professional',
      displayOrder: 0,
      url: '',
      siteUrl: '',
      downloadUrl: '',
      imageUrl: ''
    });
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (downloadFileInputRef.current) {
      downloadFileInputRef.current.value = '';
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérifier le type de fichier
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setError('Type de fichier non autorisé. Utilisez JPEG, PNG, WEBP ou GIF');
      return;
    }

    // Vérifier la taille (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError('Le fichier est trop volumineux. Taille maximale: 5MB');
      return;
    }

    // Afficher la preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Uploader le fichier
    setUploading(true);
    setError('');

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        credentials: 'include',
        // Ne pas définir Content-Type - le navigateur le fait automatiquement pour FormData
        body: uploadFormData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Erreur inconnue' }));
        console.error(
          'Erreur upload image:',
          typeof errorData?.error === 'string' ? errorData.error : JSON.stringify(errorData)
        );

        if (response.status === 401) {
          setError('❌ Session expirée. Redirection vers la page d\'accueil...');
          redirectToAdminLogin();
        } else {
          setError(errorData.error || `Erreur ${response.status}: ${errorData.message || 'Erreur lors de l\'upload'}`);
        }
        setPreviewImage(null);
        return;
      }

      const data = await response.json();

      if (data.success) {
        setFormData({ ...formData, imageUrl: data.data.url });
        setError('');
      } else {
        setError(data.error || 'Erreur lors de l\'upload de l\'image');
        setPreviewImage(null);
      }
    } catch (error) {
      console.error('Erreur:', error);
      setError('Erreur de connexion lors de l\'upload. Vérifiez votre connexion internet.');
      setPreviewImage(null);
    } finally {
      setUploading(false);
    }
  };

  const handleDownloadFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const name = file.name.toLowerCase();
    if (!name.endsWith('.zip') && !name.endsWith('.exe')) {
      setError('Extension non autorisée. Utilisez .zip ou .exe');
      return;
    }

    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('Le fichier est trop volumineux. Taille maximale: 50 Mo');
      return;
    }

    setUploadingDownload(true);
    setError('');

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('kind', 'download');

      const response = await fetch('/api/upload', {
        method: 'POST',
        credentials: 'include',
        body: uploadFormData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Erreur inconnue' }));
        console.error(
          'Erreur upload fichier projet:',
          typeof errorData?.error === 'string' ? errorData.error : JSON.stringify(errorData)
        );
        if (response.status === 401) {
          setError('❌ Session expirée. Redirection vers la page d\'accueil...');
          redirectToAdminLogin();
        } else {
          setError(errorData.error || `Erreur ${response.status}: ${errorData.message || 'Erreur lors de l\'upload'}`);
        }
        return;
      }

      const data = await response.json();

      if (data.success) {
        setFormData((prev) => ({ ...prev, downloadUrl: data.data.url }));
        setError('');
      } else {
        setError(data.error || 'Erreur lors de l\'upload du fichier');
      }
    } catch (err) {
      console.error('Erreur:', err);
      setError('Erreur de connexion lors de l\'upload. Vérifiez votre connexion internet.');
    } finally {
      setUploadingDownload(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.technologies || !formData.status) {
      setError('Tous les champs obligatoires doivent être remplis');
      return;
    }

    try {
      const url = editingProject ? `/api/projects/${editingProject.id}` : '/api/projects';
      const method = editingProject ? 'PUT' : 'POST';

      const payload = {
        ...formData,
        webAudience: formData.projectType === 'web' ? formData.webAudience : null,
      };
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        await fetchProjects();
        handleCloseDialog();
        setError('');
      } else {
        setError(data.error || 'Erreur lors de la sauvegarde');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setError('Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      return;
    }

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await response.json();

      if (data.success) {
        await fetchProjects();
        setError('');
      } else {
        setError(data.error || 'Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setError('Erreur lors de la suppression');
    }
  };

  const handleTimelendrSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = timelendrFileUrl.trim();
    if (!url) {
      setError('Indiquez une URL vers un fichier .zip (http ou https).');
      return;
    }
    try {
      const u = new URL(url);
      if (u.protocol !== 'http:' && u.protocol !== 'https:') {
        setError('L’URL doit commencer par http:// ou https://');
        return;
      }
      if (!`${u.pathname}${u.search}`.toLowerCase().includes('.zip')) {
        setError('Le lien doit pointer vers un fichier .zip (l’URL doit contenir « .zip »).');
        return;
      }
    } catch {
      setError('URL invalide.');
      return;
    }
    setTimelendrUploading(true);
    setError('');
    setTimelendrSuccessOpen(false);
    try {
      const changelog = timelendrChangelog.trim() || 'Sans description.';
      const versionTrim = timelendrVersion.trim();

      const response = await fetch('/api/timelendr/releases', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileUrl: url,
          changelog,
          version: versionTrim || null,
          platform: timelendrPlatform,
        }),
      });

      const ct = response.headers.get('content-type') || '';
      let data: { success?: boolean; error?: string; message?: string; data?: { version?: string | null } } = {};

      if (ct.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        setError(text.slice(0, 280) || `Erreur HTTP ${response.status}`);
        return;
      }

      if (!response.ok) {
        setError(data.error || `Erreur ${response.status}`);
        return;
      }

      if (data.success) {
        const v = data.data?.version ? ` v${data.data.version}` : '';
        setTimelendrSuccessDetail(data.message ? `${data.message}${v}` : `Version Timelendr ajoutée${v}.`);
        setTimelendrSuccessOpen(true);
        setTimelendrChangelog('');
        setTimelendrVersion('');
        setTimelendrFileUrl('');
        await fetchTimelendrReleases();
      } else {
        setError(data.error || 'Erreur lors de l\'ajout de la version');
      }
    } catch (err) {
      console.error(err);
      setError('Erreur réseau ou réponse invalide.');
    } finally {
      setTimelendrUploading(false);
    }
  };

  const handleDeleteTimelendrRelease = async (id: number) => {
    if (!confirm('Supprimer cette version Timelendr ?')) return;
    try {
      const response = await fetch(`/api/timelendr/releases/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        await fetchTimelendrReleases();
      } else {
        setError(data.error || 'Erreur lors de la suppression');
      }
    } catch (err) {
      console.error(err);
      setError('Erreur lors de la suppression');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography>Chargement...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Administration - Gestion des Projets
          </Typography>
          <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
            Déconnexion
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        <Snackbar
          open={timelendrSuccessOpen}
          autoHideDuration={6000}
          onClose={() => setTimelendrSuccessOpen(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setTimelendrSuccessOpen(false)}
            severity="success"
            variant="filled"
            icon={<CheckCircleIcon fontSize="inherit" />}
            sx={{ width: '100%', maxWidth: 560, alignItems: 'center' }}
          >
            {timelendrSuccessDetail || 'Version Timelendr enregistrée.'}
          </Alert>
        </Snackbar>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Gestion des Projets
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Ajouter un Projet
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Technologies</TableCell>
                <TableCell>Statut</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Web perso/pro</TableCell>
                <TableCell>Ordre</TableCell>
                <TableCell>URL</TableCell>
                <TableCell>Téléchargement</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projectsWebSorted.length > 0 && (
                <TableRow>
                  <TableCell
                    colSpan={ADMIN_PROJECT_TABLE_COL_SPAN}
                    sx={{ bgcolor: 'action.hover', fontWeight: 600, py: 1.5 }}
                  >
                    Sites web
                  </TableCell>
                </TableRow>
              )}
              {projectsWebSorted.map((project) => (
                <AdminDashboardProjectRow
                  key={project.id}
                  project={project}
                  getImageUrl={getImageUrl}
                  handleOpenProjectUrl={handleOpenProjectUrl}
                  handleOpenDialog={handleOpenDialog}
                  handleDelete={handleDelete}
                />
              ))}
              {projectsLogicielSorted.length > 0 && (
                <TableRow>
                  <TableCell
                    colSpan={ADMIN_PROJECT_TABLE_COL_SPAN}
                    sx={{ bgcolor: 'action.hover', fontWeight: 600, py: 1.5 }}
                  >
                    Logiciel
                  </TableCell>
                </TableRow>
              )}
              {projectsLogicielSorted.map((project) => (
                <AdminDashboardProjectRow
                  key={project.id}
                  project={project}
                  getImageUrl={getImageUrl}
                  handleOpenProjectUrl={handleOpenProjectUrl}
                  handleOpenDialog={handleOpenDialog}
                  handleDelete={handleDelete}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {projects.length === 0 && (
          <Card sx={{ mt: 2 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                Aucun projet trouvé
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cliquez sur &quot;Ajouter un Projet&quot; pour commencer
              </Typography>
            </CardContent>
          </Card>
        )}

        {/* Timelendr – URL .zip externe + plateforme */}
        <Typography variant="h5" component="h2" sx={{ mt: 5, mb: 2, color: '#ffffff' }}>
          Timelendr – Versions
        </Typography>
        <Card sx={{ mb: 2, bgcolor: 'grey.900', color: '#ffffff' }}>
          <CardContent sx={{ color: '#ffffff' }}>
            <Typography variant="subtitle2" sx={{ mb: 2, color: 'rgba(255,255,255,0.9)' }}>
              Indiquez une URL publique vers un fichier .zip (hébergé ailleurs : GitHub Releases, site, etc.). Pour macOS, utilisez un .zip qui contient votre fichier .dmg. Choisissez la plateforme cible (Windows, macOS ou les deux). La liste s’affiche sur la page Timelendr.
            </Typography>
            <form onSubmit={handleTimelendrSubmit}>
              <TextField
                margin="dense"
                label="URL du fichier .zip *"
                fullWidth
                variant="outlined"
                value={timelendrFileUrl}
                onChange={(e) => setTimelendrFileUrl(e.target.value)}
                required
                placeholder="https://exemple.com/chemin/vers/fichier.zip"
                helperText="L’URL doit contenir « .zip » (pour macOS: archive .zip contenant le .dmg)."
                sx={{
                  mb: 2,
                  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.8)' },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#fff' },
                  '& .MuiOutlinedInput-root': { color: '#fff' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.4)' },
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.6)' },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' },
                  '& .MuiFormHelperText-root': { color: 'rgba(255,255,255,0.55)' },
                }}
              />
              <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                <InputLabel id="timelendr-platform-label" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  Plateforme
                </InputLabel>
                <Select
                  labelId="timelendr-platform-label"
                  label="Plateforme"
                  value={timelendrPlatform}
                  onChange={(e) => setTimelendrPlatform(e.target.value as TimelendrPlatform)}
                  sx={{
                    color: '#fff',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.4)' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.6)' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' },
                  }}
                >
                  <MenuItem value="windows">Windows</MenuItem>
                  <MenuItem value="macos">macOS</MenuItem>
                  <MenuItem value="both">Windows et macOS</MenuItem>
                </Select>
              </FormControl>
              <TextField
                margin="dense"
                label="Version (optionnel)"
                fullWidth
                variant="outlined"
                value={timelendrVersion}
                onChange={(e) => setTimelendrVersion(e.target.value)}
                placeholder="ex: 1.2.0"
                sx={{
                  mb: 1,
                  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.8)' },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#fff' },
                  '& .MuiOutlinedInput-root': { color: '#fff' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.4)' },
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.6)' },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' },
                  '& .MuiInputBase-input::placeholder': { color: 'rgba(255,255,255,0.5)', opacity: 1 },
                }}
              />
              <TextField
                margin="dense"
                label="Description des changements *"
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                value={timelendrChangelog}
                onChange={(e) => setTimelendrChangelog(e.target.value)}
                required
                placeholder="Décrivez les corrections et nouveautés de cette version."
                sx={{
                  mb: 2,
                  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.8)' },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#fff' },
                  '& .MuiOutlinedInput-root': { color: '#fff' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.4)' },
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.6)' },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' },
                  '& .MuiInputBase-input::placeholder': { color: 'rgba(255,255,255,0.5)', opacity: 1 },
                }}
              />
              <Button type="submit" variant="contained" disabled={timelendrUploading} startIcon={timelendrUploading ? <CircularProgress size={20} color="inherit" /> : undefined}>
                {timelendrUploading ? 'Enregistrement…' : 'Ajouter la version'}
              </Button>
            </form>
          </CardContent>
        </Card>
        {timelendrLoading ? (
          <Typography sx={{ color: '#ffffff' }}>Chargement des versions...</Typography>
        ) : (
          <TableContainer component={Paper} sx={{ mb: 4, bgcolor: 'grey.900' }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#fff' }}>Date</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Version</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Plateforme</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Changelog</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Lien .zip</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {timelendrReleases.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell sx={{ color: '#fff' }}>{new Date(r.createdAt).toLocaleDateString('fr-FR')}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>{r.version || '—'}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>
                      {(r.platform ?? 'both') === 'windows'
                        ? 'Windows'
                        : (r.platform ?? 'both') === 'macos'
                          ? 'macOS'
                          : 'Windows et macOS'}
                    </TableCell>
                    <TableCell sx={{ color: '#fff' }}>
                      <Typography variant="body2" sx={{ maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#fff' }}>
                        {r.changelog}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button size="small" href={r.filePath} target="_blank" rel="noopener noreferrer">
                        Ouvrir
                      </Button>
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={() => handleDeleteTimelendrRelease(r.id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {timelendrReleases.length === 0 && (
              <Box sx={{ py: 2, textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: '#fff' }}>Aucune version Timelendr pour l&apos;instant.</Typography>
              </Box>
            )}
          </TableContainer>
        )}
      </Container>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingProject ? 'Modifier le Projet' : 'Ajouter un Nouveau Projet'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Par défaut, les fichiers vont dans <code>public/</code> sur la machine qui exécute Node — comme avant
              (développement local, VPS, etc.). Le stockage <strong>Vercel Blob</strong> reste{' '}
              <strong>optionnel</strong> : si vous définissez <code>BLOB_READ_WRITE_TOKEN</code>, les uploads passent
              par Blob au lieu du disque (pratique quand le serveur ne peut pas écrire dans <code>public/</code>).
              Timelendr utilise sa propre entrée (page Timelendr).
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              label="Nom du projet *"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <TextField
              margin="dense"
              label="Description *"
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
            <TextField
              margin="dense"
              label="Technologies *"
              fullWidth
              variant="outlined"
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              required
            />
            <TextField
              margin="dense"
              label="Statut *"
              fullWidth
              variant="outlined"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              required
            />
            <FormControl margin="dense" fullWidth required>
              <InputLabel id="project-type-label">Type de projet</InputLabel>
              <Select
                labelId="project-type-label"
                label="Type de projet"
                value={formData.projectType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    projectType: (e.target.value as 'logiciel' | 'web') ?? 'web',
                  })
                }
              >
                <MenuItem value="logiciel">Logiciel</MenuItem>
                <MenuItem value="web">Sites web</MenuItem>
              </Select>
            </FormControl>
            {formData.projectType === 'web' && (
              <FormControl margin="dense" fullWidth>
                <InputLabel id="web-audience-label">Public cible (sites web)</InputLabel>
                <Select
                  labelId="web-audience-label"
                  label="Public cible (sites web)"
                  value={formData.webAudience}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      webAudience: e.target.value as 'personal' | 'professional',
                    })
                  }
                >
                  <MenuItem value="professional">Réalisation professionnelle</MenuItem>
                  <MenuItem value="personal">Projet personnel</MenuItem>
                </Select>
              </FormControl>
            )}
            <TextField
              margin="dense"
              label="Ordre d'affichage"
              fullWidth
              type="number"
              variant="outlined"
              value={formData.displayOrder}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  displayOrder: Math.max(0, Number(e.target.value) || 0),
                })
              }
              inputProps={{ min: 0, step: 1 }}
              helperText="Plus petit nombre = affiché en premier."
            />
            <TextField
              margin="dense"
              label="URL du projet"
              fullWidth
              variant="outlined"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Voir le site"
              fullWidth
              variant="outlined"
              value={formData.siteUrl}
              onChange={(e) => setFormData({ ...formData, siteUrl: e.target.value })}
              placeholder="https://… (site en ligne / vitrine)"
              helperText="URL optionnelle pour la pastille “Voir le site” sur la carte."
            />
            <TextField
              margin="dense"
              label="Télécharger le projet"
              fullWidth
              variant="outlined"
              value={formData.downloadUrl}
              onChange={(e) => setFormData({ ...formData, downloadUrl: e.target.value })}
              placeholder="https://… (lien .exe, .dmg, page GitHub Releases, etc.)"
              helperText="URL optionnelle vers un dépôt ou fichier installable pour les visiteurs."
            />
            <Box sx={{ mt: 1, mb: 1 }}>
              <input
                ref={downloadFileInputRef}
                accept=".zip,.exe,application/zip,application/x-zip-compressed,application/octet-stream,application/x-msdownload"
                style={{ display: 'none' }}
                id="project-download-upload"
                type="file"
                onChange={handleDownloadFileSelect}
              />
              <label htmlFor="project-download-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={uploadingDownload ? <CircularProgress size={20} /> : <CloudUploadIcon />}
                  disabled={uploadingDownload}
                  fullWidth
                  size="small"
                >
                  {uploadingDownload ? 'Upload en cours…' : 'Uploader un fichier (.zip ou .exe, max 50 Mo)'}
                </Button>
              </label>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                Met à jour le champ avec l’URL du fichier (chemin relatif sous <code>public/</code> par défaut, ou URL
                absolue si Blob est configuré).
              </Typography>
            </Box>
            <Box sx={{ mt: 2, mb: 1 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Image du projet
              </Typography>
              <input
                ref={fileInputRef}
                accept="image/*"
                style={{ display: 'none' }}
                id="image-upload"
                type="file"
                onChange={handleFileSelect}
              />
              <label htmlFor="image-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={uploading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
                  disabled={uploading}
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  {uploading ? 'Upload en cours...' : 'Choisir une image'}
                </Button>
              </label>
              {previewImage && (
                <Box
                  sx={{
                    mt: 2,
                    mb: 2,
                    borderRadius: 2,
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 120,
                    ...getProjectImageLetterboxGlassSx(theme.palette.mode, { nestedTint: true }),
                  }}
                >
                  <Box
                    component="img"
                    src={previewImage}
                    alt="Preview"
                    sx={{
                      width: '100%',
                      maxHeight: 300,
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />
                </Box>
              )}
              <TextField
                margin="dense"
                label="URL de l'image (ou laissez vide si vous avez uploadé une image)"
                fullWidth
                variant="outlined"
                value={formData.imageUrl}
                onChange={(e) => {
                  setFormData({ ...formData, imageUrl: e.target.value });
                  if (e.target.value) {
                    setPreviewImage(e.target.value);
                  } else if (!fileInputRef.current?.files?.[0]) {
                    setPreviewImage(null);
                  }
                }}
                helperText="Vous pouvez uploader une image ou entrer une URL directement"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Annuler</Button>
            <Button type="submit" variant="contained">
              {editingProject ? 'Modifier' : 'Ajouter'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
