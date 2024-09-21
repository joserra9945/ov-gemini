import DocumentationList from './DocumentacionList/DocumentationList';
import PerfilSection from './PerfilSection/PerfilSection';

const DocRequerida = () => {
  return (
    <div className="flex flex-col gap-4">
      <PerfilSection />
      <DocumentationList />
    </div>
  );
};

export default DocRequerida;
