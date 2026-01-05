import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { TemplateCard } from '@/components/TemplateCard';
import { templates } from '@/data/templates';
import { trackClick, trackPageView, trackPageLeave } from '@/lib/tracking';

// Import template images
import template1 from '@/assets/templates/template-1.jpg';
import template2 from '@/assets/templates/template-2.jpg';
import template3 from '@/assets/templates/template-3.jpg';
import template4 from '@/assets/templates/template-4.jpg';
import template5 from '@/assets/templates/template-5.jpg';
import template6 from '@/assets/templates/template-6.jpg';
import template7 from '@/assets/templates/template-7.jpg';
import template8 from '@/assets/templates/template-8.jpg';

const featuredTemplates = [template1, template2, template3, template4];
const bottomTemplates = [template5, template6, template7, template8, template1, template2, template3, template4];

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    trackPageView('main');
    return () => trackPageLeave('main');
  }, []);

  const handleStartClick = () => {
    trackClick('btn_start');
    // Navigate to editor or signup
  };

  const handleTemplatesClick = () => {
    trackClick('btn_go_templates');
    navigate('/templates');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="container py-16 text-center md:py-24">
        <h1 className="animate-slide-up text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          세상의 모든 디자인은
          <br />
          <span className="text-primary">아자아자캔버스</span>로 완성
        </h1>
        <p className="mx-auto mt-6 max-w-2xl animate-fade-in text-lg text-muted-foreground">
          PPT와 카드뉴스부터 동영상까지 템플릿으로 쉽고 간편하게 시작해보세요!
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button onClick={handleStartClick} className="btn-hero-primary">
            바로 시작하기
          </button>
          <button onClick={handleTemplatesClick} className="btn-hero-secondary">
            템플릿 보러가기
          </button>
        </div>
      </section>

      {/* Featured Templates Row 1 - Large Cards */}
      <section className="overflow-hidden py-8">
        <div className="container">
          <div className="grid grid-cols-1 gap-4 sm:flex sm:animate-fade-in sm:overflow-x-auto sm:pb-4 sm:custom-scrollbar">
            {templates.slice(0, 4).map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                size="large"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Templates Row 2 - Medium Cards */}
      <section className="overflow-hidden py-4 pb-16">
        <div className="container">
          <div className="grid grid-cols-2 gap-4 sm:flex sm:overflow-x-auto sm:pb-4 sm:custom-scrollbar">
            {templates.slice(4, 12).map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                size="small"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30 py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 아자아자캔버스. 모든 권리 보유.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
