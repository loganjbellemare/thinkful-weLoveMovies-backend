function mapCritic(array) {
  return array.map((item) => {
    const critic = {
      critic_id: item.critic_id,
      preferred_name: item.preferred_name,
      surname: item.surname,
      organization_name: item.organization_name,
      created_at: item.created_at,
      updated_at: item.updated_at,
    };
    const {
      critic_id,
      preferred_name,
      surname,
      organization_name,
      created_at,
      updated_at,
      ...review
    } = item;
    return { ...review, critic };
  });
}

module.exports = mapCritic;
