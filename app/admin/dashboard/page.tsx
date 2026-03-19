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
	IconButton,
	Paper,
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
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback, useRef } from 'react';
import { upload } from '@vercel/blob/client';

interface Project {
  id: number;
  name: string;
  description: string;
  technologies: string;
  status: string;
  url?: string;
  downloadUrl?: string | null;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

interface TimelendarRelease {
  id: number;
  filePath: string;
  changelog: string;
  version: string | null;
  createdAt: string;
  updatedAt: string;
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
    url: '',
    downloadUrl: '',
    imageUrl: ''
  });
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Timelendar releases
  const [timelendarReleases, setTimelendarReleases] = useState<TimelendarRelease[]>([]);
  const [timelendarLoading, setTimelendarLoading] = useState(true);
  const [timelendarChangelog, setTimelendarChangelog] = useState('');
  const [timelendarVersion, setTimelendarVersion] = useState('');
  const [timelendarUploading, setTimelendarUploading] = useState(false);
  const [timelendarSuccessOpen, setTimelendarSuccessOpen] = useState(false);
  const [timelendarSuccessDetail, setTimelendarSuccessDetail] = useState('');
  const timelendarFileRef = useRef<HTMLInputElement>(null);
  /** null = chargement ; true = upload direct Vercel Blob (contourne ~4,5 Mo sur les fonctions serverless) */
  const [timelendarBlobUpload, setTimelendarBlobUpload] = useState<boolean | null>(null);

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

  const fetchProjects = useCallback(async () => {
    try {
      const response = await fetch('/api/projects');
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
  }, [router]);

  const fetchTimelendarReleases = useCallback(async () => {
    try {
      const response = await fetch('/api/timelendar/releases');
      const data = await response.json();
      if (data.success) {
        setTimelendarReleases(data.data);
      }
    } catch (e) {
      console.error('Timelendar releases:', e);
    } finally {
      setTimelendarLoading(false);
    }
  }, []);

  const fetchTimelendarUploadConfig = useCallback(async () => {
    try {
      const response = await fetch('/api/timelendar/upload-config');
      const data = await response.json();
      setTimelendarBlobUpload(Boolean(data.blobUploadEnabled));
    } catch {
      setTimelendarBlobUpload(false);
    }
  }, []);

  // Fonction pour nettoyer le localStorage et rediriger
  const clearStorageAndRedirect = useCallback(() => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/');
  }, [router]);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');
    
    if (!token || !user) {
      clearStorageAndRedirect();
      return;
    }

    fetchProjects();
    fetchTimelendarReleases();
    fetchTimelendarUploadConfig();
  }, [router, fetchProjects, fetchTimelendarReleases, fetchTimelendarUploadConfig, clearStorageAndRedirect]);

  const handleLogout = () => {
    // Nettoyer le localStorage
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/');
  };

  const handleOpenDialog = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        name: project.name,
        description: project.description,
        technologies: project.technologies,
        status: project.status,
        url: project.url || '',
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
        url: '',
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
      url: '',
      downloadUrl: '',
      imageUrl: ''
    });
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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
      // Vérifier que l'utilisateur est connecté
      const token = localStorage.getItem('adminToken');
      const user = localStorage.getItem('adminUser');
      
      if (!token || !user) {
        setError('Session expirée. Veuillez vous reconnecter.');
        setUploading(false);
        setPreviewImage(null);
        setTimeout(() => {
          router.push('/');
        }, 2000);
        return;
      }

      const uploadFormData = new FormData();
      uploadFormData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
          // Ne pas définir Content-Type - le navigateur le fait automatiquement pour FormData
        },
        body: uploadFormData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Erreur inconnue' }));
        console.error('Erreur upload:', errorData);
        
        if (response.status === 401) {
          setError('❌ Session expirée. Redirection vers la page d\'accueil...');
          clearStorageAndRedirect();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.technologies || !formData.status) {
      setError('Tous les champs obligatoires doivent être remplis');
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/');
        return;
      }

      const url = editingProject ? `/api/projects/${editingProject.id}` : '/api/projects';
      const method = editingProject ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
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
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/');
        return;
      }

      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
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

  const handleTimelendarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = timelendarFileRef.current?.files?.[0];
    if (!file || !file.name.toLowerCase().endsWith('.zip')) {
      setError('Veuillez sélectionner un fichier .zip (max 50 Mo).');
      return;
    }
    const maxBytes = 50 * 1024 * 1024;
    if (file.size > maxBytes) {
      setError('Le fichier est trop volumineux. Taille max : 50 Mo.');
      return;
    }
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/');
      return;
    }
    setTimelendarUploading(true);
    setError('');
    setTimelendarSuccessOpen(false);
    try {
      const changelog = timelendarChangelog.trim() || 'Sans description.';
      const versionTrim = timelendarVersion.trim();

      let response: Response;
      if (timelendarBlobUpload) {
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const pathname = `timelendar/${Date.now()}_${safeName}`;
        const blob = await upload(pathname, file, {
          access: 'public',
          handleUploadUrl: '/api/timelendar/blob-client',
          headers: { Authorization: `Bearer ${token}` },
          multipart: file.size >= 4 * 1024 * 1024,
        });
        response = await fetch('/api/timelendar/releases/register', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            filePath: blob.url,
            changelog,
            version: versionTrim || null,
          }),
        });
      } else {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('changelog', changelog);
        if (versionTrim) formData.append('version', versionTrim);
        response = await fetch('/api/timelendar/releases', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
      }

      const ct = response.headers.get('content-type') || '';
      let data: { success?: boolean; error?: string; message?: string; data?: { version?: string | null } } = {};

      if (ct.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        if (response.status === 413) {
          setError(
            timelendarBlobUpload
              ? 'Erreur 413 inattendue. Réessayez ou contactez le support.'
              : 'Le serveur a refusé le fichier (413 — trop volumineux). Sur Vercel, le corps des requêtes vers l’API est plafonné (~4,5 Mo) : ajoutez un store Vercel Blob et la variable BLOB_READ_WRITE_TOKEN sur le projet pour uploader des .zip plus gros, ou réduisez le fichier.'
          );
        } else {
          setError(text.slice(0, 280) || `Erreur HTTP ${response.status}`);
        }
        return;
      }

      if (!response.ok) {
        setError(data.error || `Erreur ${response.status}`);
        return;
      }

      if (data.success) {
        const v = data.data?.version ? ` v${data.data.version}` : '';
        setTimelendarSuccessDetail(data.message ? `${data.message}${v}` : `Version Timelendar ajoutée${v} — le .zip est en ligne.`);
        setTimelendarSuccessOpen(true);
        setTimelendarChangelog('');
        setTimelendarVersion('');
        if (timelendarFileRef.current) timelendarFileRef.current.value = '';
        await fetchTimelendarReleases();
      } else {
        setError(data.error || 'Erreur lors de l\'ajout de la version');
      }
    } catch (err) {
      console.error(err);
      setError('Erreur lors de l\'upload (réseau ou réponse invalide).');
    } finally {
      setTimelendarUploading(false);
    }
  };

  const handleDeleteTimelendarRelease = async (id: number) => {
    if (!confirm('Supprimer cette version Timelendar ?')) return;
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/');
      return;
    }
    try {
      const response = await fetch(`/api/timelendar/releases/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        await fetchTimelendarReleases();
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
          open={timelendarSuccessOpen}
          autoHideDuration={6000}
          onClose={() => setTimelendarSuccessOpen(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setTimelendarSuccessOpen(false)}
            severity="success"
            variant="filled"
            icon={<CheckCircleIcon fontSize="inherit" />}
            sx={{ width: '100%', maxWidth: 560, alignItems: 'center' }}
          >
            {timelendarSuccessDetail || 'Upload Timelendar réussi.'}
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
                <TableCell>URL</TableCell>
                <TableCell>Téléchargement</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {project.description}
                    </Typography>
                  </TableCell>
                  <TableCell>{project.technologies}</TableCell>
                  <TableCell>{project.status}</TableCell>
                  <TableCell>
                    {project.url && (
                      <Button
                        size="small"
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Voir
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>
                    {project.downloadUrl && (
                      <Button
                        size="small"
                        href={project.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
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
                          display: 'block'
                        }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(project)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(project.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
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

        {/* Timelendar – Versions (.zip + description des changements) */}
        <Typography variant="h5" component="h2" sx={{ mt: 5, mb: 2, color: '#ffffff' }}>
          Timelendar – Versions
        </Typography>
        <Card sx={{ mb: 2, bgcolor: 'grey.900', color: '#ffffff' }}>
          <CardContent sx={{ color: '#ffffff' }}>
            <Typography variant="subtitle2" sx={{ mb: 2, color: 'rgba(255,255,255,0.9)' }}>
              {timelendarBlobUpload === null
                ? 'Chargement du mode d’upload…'
                : timelendarBlobUpload
                  ? 'Fichier .zip jusqu’à 50 Mo : envoi direct vers Vercel Blob (adapté à la production Vercel). Puis enregistrement en base.'
                  : 'Fichier .zip jusqu’à 50 Mo : envoi via l’API (OK en local ; sur Vercel sans Blob, limite ~4,5 Mo par requête — configurez BLOB_READ_WRITE_TOKEN + store Blob).'}
              {' '}La description s’affiche sur la page Timelendar ; une confirmation apparaît en haut après un envoi réussi.
            </Typography>
            <form onSubmit={handleTimelendarSubmit}>
              <input
                ref={timelendarFileRef}
                type="file"
                accept=".zip"
                style={{ display: 'none' }}
                id="timelendar-zip-upload"
              />
              <label htmlFor="timelendar-zip-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={timelendarUploading ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : <CloudUploadIcon />}
                  disabled={timelendarUploading || timelendarBlobUpload === null}
                  sx={{ mb: 2, mr: 2, color: '#fff', borderColor: 'rgba(255,255,255,0.5)', '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.08)' } }}
                >
                  {timelendarUploading ? 'Upload en cours...' : timelendarBlobUpload === null ? 'Chargement…' : 'Choisir un .zip (max 50 Mo)'}
                </Button>
              </label>
              <TextField
                margin="dense"
                label="Version (optionnel)"
                fullWidth
                variant="outlined"
                value={timelendarVersion}
                onChange={(e) => setTimelendarVersion(e.target.value)}
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
                value={timelendarChangelog}
                onChange={(e) => setTimelendarChangelog(e.target.value)}
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
              <Button type="submit" variant="contained" disabled={timelendarUploading || timelendarBlobUpload === null}>
                Ajouter la version
              </Button>
            </form>
          </CardContent>
        </Card>
        {timelendarLoading ? (
          <Typography sx={{ color: '#ffffff' }}>Chargement des versions...</Typography>
        ) : (
          <TableContainer component={Paper} sx={{ mb: 4, bgcolor: 'grey.900' }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#fff' }}>Date</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Version</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Changelog</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Fichier</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {timelendarReleases.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell sx={{ color: '#fff' }}>{new Date(r.createdAt).toLocaleDateString('fr-FR')}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>{r.version || '—'}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>
                      <Typography variant="body2" sx={{ maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#fff' }}>
                        {r.changelog}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button size="small" href={r.filePath} target="_blank" rel="noopener noreferrer">
                        Télécharger
                      </Button>
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={() => handleDeleteTimelendarRelease(r.id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {timelendarReleases.length === 0 && (
              <Box sx={{ py: 2, textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: '#fff' }}>Aucune version Timelendar pour l&apos;instant.</Typography>
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
              label="Télécharger le projet"
              fullWidth
              variant="outlined"
              value={formData.downloadUrl}
              onChange={(e) => setFormData({ ...formData, downloadUrl: e.target.value })}
              placeholder="https://… (lien .exe, .dmg, page GitHub Releases, etc.)"
              helperText="URL optionnelle vers un dépôt ou fichier installable pour les visiteurs."
            />
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
                <Box sx={{ mt: 2, mb: 2 }}>
                  <Box
                    component="img"
                    src={previewImage}
                    alt="Preview"
                    sx={{
                      width: '100%',
                      maxHeight: 300,
                      objectFit: 'contain',
                      borderRadius: 2,
                      border: '1px solid #e0e0e0'
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
