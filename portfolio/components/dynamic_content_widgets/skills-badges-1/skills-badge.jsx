
export default function SkillsBadge({item}) {

  return (
    // If item has "sub-skills" then recursively call SkillsBadge, else return normal component
    (item.subSkills) ?
      item.subSkills.map((subSkill, index) => {
        return (
          <SkillsBadge key={index} item={subSkill} />
        )
      })
    :
      <li>
        
        {(item.link) ?
          <a href={item.link} target="_blank" rel="nofollow">
            <img src={item.badge} alt={item.name} title={item.name} />
          </a>
        :
          <img src={item.badge} alt={item.name} title={item.name} />
        }

      </li>

  )
}