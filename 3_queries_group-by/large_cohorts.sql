SELECT cohorts.name AS cohort_name, count(students.*) AS student_count
FROM cohorts 
JOIN students ON cohorts.id = cohort_id
GROUP BY cohorts.name
HAVING count(*) >= 18
ORDER BY student_count ASC;