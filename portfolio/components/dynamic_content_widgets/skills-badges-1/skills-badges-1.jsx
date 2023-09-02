import styles from './skills-badges-1.module.css';
import SkillsBadge from './skills-badge';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

function SkillsBadges1({ items }) {

  useEffect(() => {
    const loadInfiniteSlide = async () => {

      const { default: jquery } = await import('jquery');
      await import('@/lib/jquery/plugins/infiniteslidev2.js')
      
      const initializeInfiniteslide = () => {
        jquery('.skills-badges-1 ul').infiniteslide({
          speed: 50,
          pauseonhover: false,
        });
      };

      jquery(document).ready(function () {
        initializeInfiniteslide();
      });
    }
  
    if (typeof window !== 'undefined') {
      loadInfiniteSlide()
    }
  }, [items])

  return (
    <div className="container-fluid">
      <div className={`row skills-badges-1 ${styles.skills_badges_1}`}>
        <div className={`${styles.col} col-12 px-0`}>
          <ul style={{ display: 'none' }}>
            {items.map((item, index) => (
              <SkillsBadge key={index} item={item} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(SkillsBadges1), {
  ssr: false,
});
